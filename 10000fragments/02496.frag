uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 3.97 + t * 0.29) - 0.5) * 2.0;
    v = sin((p.y * 5.70 + zx * 1.49 + t * 2.88) * 3.1415927 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 7.96;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 1.63)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 12.44 - t * 4.80 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.87;
	vec2 q1 = p; vec2 q2 = p;
	q1 = vec2(q1.x * q1.x - q1.y * q1.y, 2.0 * q1.x * q1.y) * 0.87;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; q2.x += 0.44 / wf * sin(wf * 1.85 * q2.y + time * 1.27); q2.y += 0.37 / wf * cos(wf * 3.30 * q2.x + time * 1.84); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.36);
	float d = 0.5 * (d1 + d2);
	vec3 col = hue(d * 0.63 + time * 0.21);
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
