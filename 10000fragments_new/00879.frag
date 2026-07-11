uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 8; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.19 * sin(mf + 3.0) + ph), cos(t * 1.21 * cos(mf + 3.0) + ph));
        ms += 0.063 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.32, 0.0)) * 23.94 - t * 7.86 + ph);
    float mb = sin(length(p + vec2(0.32, 0.0)) * 10.90 - t * 7.77 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.65;
	vec2 q1 = p; vec2 q2 = p;
	q2 = (floor(q2 * 10.6) + 0.5) / 10.6;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.20);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.56));
	vec3 col = hue(d * 0.74 + time * 0.28);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.11;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
