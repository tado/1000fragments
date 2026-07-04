uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 4.45;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 1.89)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 21.99 - t * 5.39 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 8.78 - t * 6.14 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.01;
	vec2 q1 = p; vec2 q2 = p;
	q1 *= 2.24;
	q1 *= 1.0 + 0.32 * sin(time * 3.83);
	{ float fr = length(q2); q2 *= 1.0 + -0.36 * fr * fr; }
	for(int fo = 0; fo < 5; fo++){ q2 = abs(q2) - 0.58; q2 = rot2(2.60) * q2; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.96);
	float d = max(d1, d2);
	vec3 col = hue(d * 0.55 + time * 0.34);
	col *= 0.80 + 0.15 * sin(gl_FragCoord.y * 1.52 + time * 14.63);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
