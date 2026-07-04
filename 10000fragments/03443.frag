uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 17.57 + sin(p.y * 5.28 + t * 1.52) * 1.38 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.78; vec2 jc = vec2(-0.60 + 0.3 * sin(t * 0.72 + ph), -0.47 + 0.3 * cos(t * 1.52 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 25; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 25.0 * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 17.53 + sin(p.y * 3.15 + t * 2.25) * 4.96 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = rot2(length(q1) * -3.48 + time * 0.89) * q1;
	q1 += vec2(0.02, 0.72) * sin(length(q1) * 5.34 - time * 2.17) * 0.11;
	q2 *= 1.0 + 0.34 * sin(time * 1.95);
	q2 = fract(q2 * 1.02) - 0.5;
	q3 = vec2(q3.x * q3.x - q3.y * q3.y, 2.0 * q3.x * q3.y) * 0.51;
	q3 = rot2(time * 1.41) * q3;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.72);
	float d3 = fieldC(q3, time, 1.99);
	d2 = d2 * d3;
	float d = d1 * d2;
	vec3 col = hue(d * 1.26 + time * 0.25);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.14));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
