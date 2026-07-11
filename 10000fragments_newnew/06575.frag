uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 7.00;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 2.84)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 24.48 - t * 7.41 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 13.93 + t * 2.05 + ph) + sin(p.y * 5.01 - t * 2.05 + ph)
        + sin((p.x + p.y) * 8.25 + t * 2.05 + ph) + sin(length(p) * 11.23 - t * 2.05 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.14;
	vec2 q1 = p; vec2 q2 = p;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.08);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.46));
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.78, 0.61, 1.39) + vec3(0.17, 0.16, 0.05);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
