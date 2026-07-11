uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.37; vec2 jc = vec2(0.15 + 0.3 * sin(t * 0.76 + ph), -0.49 + 0.3 * cos(t * 0.76 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 18; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(18) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = fract(p * 2.84) - 0.5;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.31, lr * 2.48 + time * 0.79); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.97 + time * 0.10, vec3(0.54, 0.59, 0.53), vec3(0.35, 0.50, 0.36), vec3(0.98, 0.72, 1.07), vec3(0.23, 0.49, 0.23));
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
