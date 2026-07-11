uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 5; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.35 + jf * 4.0), cos(t * 0.21 * jf)) * 0.66;
        xs += sin(length(p - im) * 153.91 - t * 11.94 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.70; vec2 jc = vec2(0.28 + 0.3 * sin(t * 0.96 + ph), 0.29 + 0.3 * cos(t * 1.05 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 36; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 36.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.51;
	vec2 q1 = p; vec2 q2 = p;
	q1.y += sin(q1.x * 6.10 + time * 1.09) * 0.39;
	q1 = fract(q1 * 2.06) - 0.5;
	q2 = rot2(q2.y * -2.21 + time * 0.86) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.52);
	float d = max(d1, d2);
	vec3 col = vec3(0.52, 0.85, 0.24) * (0.11 / (abs(d) + 0.03));
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.59 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
