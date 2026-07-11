uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 18.63 - t * 8.82 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 3.57;
    v = 0.5 * (sin(3.0 * cp.x + t * 1.53) * sin(5.0 * cp.y + ph)
             + sin(5.0 * cp.x - t * 1.30) * sin(3.0 * cp.y + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	q1 = fract(q1 * 1.87) - 0.5;
	q1 = rot2(0.35) * q1;
	{ float iv = dot(q2, q2) + 0.05; q2 = q2 / iv * 0.75; }
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; q2.x += 0.41 / wf * sin(wf * 2.70 * q2.y + time * 1.34); q2.y += 0.31 / wf * cos(wf * 2.29 * q2.x + time * 1.47); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.56);
	float d = max(d1, d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 2.30 + time * 0.50);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.09;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
