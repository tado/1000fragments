uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.23, 0.0)) * 25.69 - t * 4.05 + ph);
    float mb = sin(length(p + vec2(0.23, 0.0)) * 12.70 - t * 4.05 + ph);
    v = ma * mb;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.64; vec2 jc = vec2(-0.18 + 0.3 * sin(t * 0.73 + ph), -0.29 + 0.3 * cos(t * 0.73 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 18; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(18) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.02);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 0.77 + time * 0.28, vec3(0.54, 0.54, 0.48), vec3(0.42, 0.39, 0.37), vec3(1.26, 0.90, 0.88), vec3(0.39, 0.06, 0.07));
	col = fract(col * 1.89);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
