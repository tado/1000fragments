uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.36 + 0.12 * cos(sa * 4 + t * 0.67 + ph);
    v = sin((sr - petal) * 14.45);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 3.43;
	p = rot2(p.y * 3.60 + time * 0.12) * p;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.48; p = rot2(0.82) * p; }
	{ float fr = length(p); p *= 1.0 + -0.76 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.53, 0.84, 0.93) + vec3(0.02, 0.05, 0.08);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
