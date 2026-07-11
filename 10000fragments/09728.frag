uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.81; vec2 jc = vec2(-0.04 + 0.3 * sin(t * 1.14 + ph), -0.77 + 0.3 * cos(t * 1.14 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 19; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(19) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.63;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.17 + time * 0.23, vec3(0.59, 0.57, 0.59), vec3(0.50, 0.34, 0.50), vec3(1.10, 0.79, 1.40), vec3(0.61, 0.86, 0.79));
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
