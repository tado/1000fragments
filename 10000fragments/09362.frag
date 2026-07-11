uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 8; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.28 + jf * 4.0), cos(t * 0.38 * jf)) * 0.60;
        xs += sin(length(p - im) * 168.02 - t * 13.85 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.47; vec2 jc = vec2(-0.64 + 0.3 * sin(t * 1.38 + ph), -0.40 + 0.3 * cos(t * 1.38 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 31; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(31) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.88;
	p = abs(p);
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.45);
	float d = d1 + d2;
	vec3 col = palette(d * 0.62 + time * 0.16, vec3(0.40, 0.45, 0.43), vec3(0.45, 0.33, 0.35), vec3(1.12, 1.25, 1.09), vec3(0.75, 0.40, 0.68));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
