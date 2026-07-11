uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.75; vec2 jc = vec2(-0.05 + 0.3 * sin(t * 0.24 + ph), -0.67 + 0.3 * cos(t * 0.24 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 33; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(33) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.71, 0.51, 1.22) + vec3(0.16, 0.06, 0.03);
	col = fract(col * 1.03);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
