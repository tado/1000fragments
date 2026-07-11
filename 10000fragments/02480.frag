uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.55 + 0.14 * cos(sa * 4 + t * 2.77 + ph);
    v = sin((sr - petal) * 18.40);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.10;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.26; p = rot2(0.47) * p; }
	p = rot2(time * -0.88) * p;
	p = abs(p) - 0.79;
	p = rot2(length(p) * 3.58 + time * 0.31) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.53, 0.81, 1.51) + vec3(0.20, 0.25, 0.04);
	col = mod(col * 1.54, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
