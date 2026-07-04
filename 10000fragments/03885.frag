uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 15.78 + t * 3.11 + ph) + sin(p.y * 11.24 - t * 2.97 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.27;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.21, 0.46, 0.25) * (0.16 / (abs(d) + 0.10));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
