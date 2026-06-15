uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 11.87 + t * 4.22 + ph) + sin(p.y * 13.73 - t * 4.22 + ph)
        + sin((p.x + p.y) * 8.13 + t * 4.22 + ph) + sin(length(p) * 13.23 - t * 4.22 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.80;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.46), field(p, time, 0.91));
	col = 0.5 + 0.5 * col;
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
