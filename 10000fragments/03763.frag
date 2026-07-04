uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 11.50 + t * 2.74 + ph) + sin(p.y * 8.20 - t * 5.06 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = (floor(p * 23.3) + 0.5) / 23.3;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.46), field(p, time, 0.91));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
