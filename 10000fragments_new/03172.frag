uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 10.28 + sr * 11.10 - t * 1.52 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 7.56;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 2.01)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 26.47 - t * 6.22 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.42;
	vec2 q1 = p; vec2 q2 = p;
	q1 *= 2.01;
	q2 += vec2(0.01, 0.40) * sin(length(q2) * 5.15 - time * 1.19) * 0.27;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.46);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.41));
	vec3 col = palette(d * 1.48 + time * 0.25, vec3(0.58, 0.55, 0.54), vec3(0.35, 0.41, 0.38), vec3(1.26, 0.97, 1.02), vec3(0.23, 0.88, 0.74));
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.12;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
