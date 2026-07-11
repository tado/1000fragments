uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 9.65 + t * 3.63 + ph) + sin(p.y * 7.03 - t * 3.63 + ph)
        + sin((p.x + p.y) * 4.01 + t * 3.63 + ph) + sin(length(p) * 14.33 - t * 3.63 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.28), field(p, time, 2.56));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
