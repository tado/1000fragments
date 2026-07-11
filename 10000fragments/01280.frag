uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 12.44 + t * 4.24 + ph) + sin(p.y * 10.62 - t * 4.24 + ph)
        + sin((p.x + p.y) * 4.06 + t * 4.24 + ph) + sin(length(p) * 15.26 - t * 4.24 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.33), field(p, time, 2.66));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.25));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
