uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 6; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.66 + jf * 4.0), cos(t * 0.51 * jf)) * 0.39;
        xs += sin(length(p - im) * 85.51 - t * 9.99 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.94; vec2 jc = vec2(-0.70 + 0.3 * sin(t * 1.00 + ph), 0.12 + 0.3 * cos(t * 1.00 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 23; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(23) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.19;
	{ p = vec2(atan(p.y, p.x) * 2.56, length(p) * 4.16 - time * 0.27); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.38);
	float d = d1 * d2;
	vec3 col = palette(d * 1.23 + time * 0.17, vec3(0.53, 0.41, 0.42), vec3(0.41, 0.31, 0.36), vec3(1.22, 0.77, 1.11), vec3(0.59, 0.39, 0.43));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.98));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
