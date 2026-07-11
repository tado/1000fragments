uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 12.40 + t * 1.31 + ph) + sin(p.y * 2.21 - t * 1.31 + ph)
        + sin((p.x + p.y) * 9.26 + t * 1.31 + ph) + sin(length(p) * 15.42 - t * 1.31 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.46;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.44), field(p, time, 0.88));
	col = 0.5 + 0.5 * col;
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
