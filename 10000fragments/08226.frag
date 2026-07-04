uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.60; vec2 jc = vec2(0.10 + 0.3 * sin(t * 1.70 + ph), 0.35 + 0.3 * cos(t * 1.35 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 37; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 37.0 * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 3.43;
    v = 0.5 * (sin(5.0 * cp.x + t * 0.88) * sin(4.0 * cp.y + ph)
             + sin(4.0 * cp.x - t * 0.60) * sin(5.0 * cp.y + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.70;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.52);
	float d = d1 * d2;
	vec3 col = palette(d * 1.28 + time * 0.10, vec3(0.51, 0.46, 0.47), vec3(0.40, 0.43, 0.40), vec3(0.73, 0.89, 1.32), vec3(0.53, 0.64, 0.09));
	col = fract(col * 1.33);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
