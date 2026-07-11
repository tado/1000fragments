uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 3.31 + t * 0.98) - 0.5) * 2.0;
    v = sin((p.y * 6.18 + zx * 1.09 + t * 2.66) * 3.1415927 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = vec2(p.x * p.x - p.y * p.y, 2.0 * p.x * p.y) * 0.98;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.57), field(p, time, 1.14));
	col = 0.5 + 0.5 * col;
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
