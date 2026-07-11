uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 4.12 + t * 0.74 + ph) + sin(p.y * 11.66 - t * 0.74 + ph)
        + sin((p.x + p.y) * 11.44 + t * 0.74 + ph) + sin(length(p) * 7.68 - t * 0.74 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 9.61 + t * 1.39 + ph) + sin(p.y * 9.09 - t * 3.02 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.97;
	vec2 q1 = p; vec2 q2 = p;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; q2.x += 0.40 / wf * sin(wf * 3.24 * q2.y + time * 1.24); q2.y += 0.43 / wf * cos(wf * 3.49 * q2.x + time * 0.90); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.38);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.56));
	vec3 col = hue(d * 1.32 + time * 0.27);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.10;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
