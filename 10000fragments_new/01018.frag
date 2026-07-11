uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 3.32;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 2.64)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 21.07 - t * 7.85 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 4.99) - 0.5;
    float rad = 0.45 + 0.12 * sin(t * 2.75 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.08;
	vec2 q1 = p; vec2 q2 = p;
	q1 = (floor(q1 * 28.3) + 0.5) / 28.3;
	q1.y += sin(q1.x * 5.35 + time * 1.35) * 0.21;
	q2 = fract(q2 * 2.99) - 0.5;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.27);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.40));
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.40, 0.24, 0.36), vec3(0.99, 0.97, 0.49), cc);
	col = clamp((col - 0.5) * 1.50 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
