uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.91; vec2 jc = vec2(-0.09 + 0.3 * sin(t * 0.80 + ph), 0.45 + 0.3 * cos(t * 0.89 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 27; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 27.0 * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.92 + 0.34 * sin(t * 0.84)) + vec2(-0.42, -0.07) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 20; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 20.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.51;
	vec2 q1 = p; vec2 q2 = p;
	q1 = abs(q1);
	for(int fo = 0; fo < 2; fo++){ q2 = abs(q2) - 0.33; q2 = rot2(2.25) * q2; }
	q2 = abs(q2);
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.63);
	float d = d1 * d2;
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.55, 0.63, 1.44) + vec3(0.06, 0.09, 0.05);
	col *= 0.83 + 0.11 * sin(gl_FragCoord.y * 1.33 + time * 4.11);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
