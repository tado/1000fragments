uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 26.28 - t * 4.42 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.43; vec2 jc = vec2(-0.54 + 0.3 * sin(t * 1.47 + ph), -0.12 + 0.3 * cos(t * 0.56 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 19; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 19.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	q1 *= 2.80;
	q1 = rot2(length(q1) * 2.39 + time * 0.43) * q1;
	{ q2 = vec2(atan(q2.y, q2.x) * 1.30, length(q2) * 5.19 - time * 0.85); }
	q2 = rot2(length(q2) * 2.12 + time * 0.93) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.53);
	float d = abs(d1 - d2);
	vec3 col = hue(d * 0.91 + time * 0.33);
	col *= 0.86 + 0.13 * sin(gl_FragCoord.y * 2.50 + time * 15.91);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
