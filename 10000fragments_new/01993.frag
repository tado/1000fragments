uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.50; vec2 jc = vec2(0.19 + 0.3 * sin(t * 0.36 + ph), 0.48 + 0.3 * cos(t * 1.50 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 38; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 38.0 * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.59 + 0.14 * sin(t * 1.14)) + vec2(-0.38, -0.12) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 30; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 30.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.29;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(q1.y * -2.70 + time * 1.03) * q1;
	{ q1 = vec2(atan(q1.y, q1.x) * 1.43, length(q1) * 3.47 - time * 0.91); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.24);
	float d = 0.5 * (d1 + d2);
	vec3 col = hue(d * 1.37 + time * 0.14);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
