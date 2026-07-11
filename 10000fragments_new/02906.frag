uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 11.14 + t * 4.43 + ph) + sin(p.y * 2.65 - t * 1.55 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.09 + 0.10 * sin(t * 1.18)) + vec2(-0.24, 0.02) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 16; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 16.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.79;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(q1.y * -2.49 + time * 1.07) * q1;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; q2.x += 0.27 / wf * sin(wf * 1.69 * q2.y + time * 1.91); q2.y += 0.46 / wf * cos(wf * 1.74 * q2.x + time * 0.87); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.13);
	float d = abs(d1 - d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.10, 0.21, 0.50), vec3(0.64, 0.58, 0.70), cc);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.21));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
