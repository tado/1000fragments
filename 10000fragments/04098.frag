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
    float pa = atan(p.y, p.x) + t * 0.65;
    float pk = 6.2831853 / 5.0;
    float pd = cos(floor(0.5 + pa / pk) * pk - pa) * length(p);
    v = sin(pd * 12.26 - t * 4.84 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 5.21;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 1.75)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 29.27 - t * 6.27 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 pk = p * 4.97;
    pk.x += step(0.5, fract(pk.y * 0.5)) * 0.5;
    vec2 pf = fract(pk) - 0.5;
    float rad = 0.29 + 0.12 * sin(t * 2.48 + floor(pk.y) * 1.7 + ph);
    v = (1.0 - smoothstep(rad - 0.1, rad, length(pf))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = rot2(time * -0.65) * q1;
	q1 = sin(q1 * 1.17 + time * 0.73) * 0.82;
	q2 = mix(q2, q2.yx, 0.5 + 0.5 * sin(time * 1.12));
	q2 = sin(q2 * 1.80 + time * 2.04) * 0.72;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.51);
	float d3 = fieldC(q3, time, 1.68);
	d2 = 0.5 * (d2 + d3);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.33));
	vec3 col = hue(d * 1.09 + time * 0.23);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
