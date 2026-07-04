uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.01 + 0.35 * sin(t * 0.55)) + vec2(-0.29, -0.11) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 29; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 29.0 * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.41; vec2 jc = vec2(-0.36 + 0.3 * sin(t * 0.73 + ph), 0.03 + 0.3 * cos(t * 0.96 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 35; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 35.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(q1.y * 2.06 + time * 0.42) * q1;
	q2 = fract(q2 * 2.26) - 0.5;
	q2 = vec2(q2.x * q2.x - q2.y * q2.y, 2.0 * q2.x * q2.y) * 0.72;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.89);
	float d = min(d1, d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 3.21 + time * 0.96);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
