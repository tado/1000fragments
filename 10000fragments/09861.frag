uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.52; vec2 jc = vec2(-0.23 + 0.3 * sin(t * 0.94 + ph), 0.56 + 0.3 * cos(t * 0.94 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 20; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(20) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.35, 0.0)) * 21.66 - t * 1.11 + ph);
    float mb = sin(length(p + vec2(0.35, 0.0)) * 11.74 - t * 1.11 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.09);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.75 + time * 0.05, vec3(0.55, 0.41, 0.49), vec3(0.44, 0.44, 0.39), vec3(0.93, 0.84, 0.70), vec3(0.21, 0.66, 0.10));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.58));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
