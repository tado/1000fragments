uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 4.47;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 1.54)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 28.68 - t * 4.67 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 9.37 + sr * 11.43 - t * 2.86 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.69;
	vec2 q1 = p; vec2 q2 = p;
	q1.x += sin(q1.y * 4.26 + time * 1.87) * 0.37;
	q1 = fract(q1 * 1.38) - 0.5;
	q2 = (floor(q2 * 15.1) + 0.5) / 15.1;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.65);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.04 + time * 0.20, vec3(0.41, 0.56, 0.56), vec3(0.46, 0.48, 0.44), vec3(0.78, 1.35, 0.86), vec3(0.22, 0.52, 0.72));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.57 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
