uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.40 + 0.30 * cos(sa * 6 + t * 1.30 + ph);
    v = sin((sr - petal) * 13.95);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = abs(p);
	p = rot2(p.y * -2.95 + time * 0.55) * p;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.23; p = rot2(1.64) * p; }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.09 + time * 0.18);
	col = mod(col * 2.73, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
