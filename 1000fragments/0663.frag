uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 4.68 + t * 5.58 + ph) + sin(p.y * 17.45 - t * 5.12 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.79;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.30), field(p, time, 2.60));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.11));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
