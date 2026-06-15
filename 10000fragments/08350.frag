uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.44; vec2 jc = vec2(0.26 + 0.3 * sin(t * 1.12 + ph), 0.14 + 0.3 * cos(t * 1.12 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 24; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(24) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.48;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.01 + time * 0.12, vec3(0.53, 0.56, 0.59), vec3(0.38, 0.33, 0.30), vec3(0.99, 1.28, 1.28), vec3(0.54, 0.41, 0.93));
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
