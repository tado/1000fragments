uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.80; vec2 jc = vec2(0.23 + 0.3 * sin(t * 1.43 + ph), 0.69 + 0.3 * cos(t * 1.25 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 29; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 29.0 * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 12.22);
    float gsh = hash21(vec2(grow, floor(t * 9.63))) - 0.5;
    float gx = p.x + gsh * 0.66;
    v = sin(gx * 14.97 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 2.34));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.37;
	vec2 q1 = p; vec2 q2 = p;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; q1.x += 0.42 / wf * sin(wf * 3.56 * q1.y + time * 0.82); q1.y += 0.32 / wf * cos(wf * 2.34 * q1.x + time * 1.24); }
	q1 = rot2(time * -1.50) * q1;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.34);
	float d = d1 * d2;
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.17, 0.11, 0.51), vec3(0.82, 0.81, 0.64), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
