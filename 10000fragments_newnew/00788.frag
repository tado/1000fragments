uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 3.21;
    v = 0.5 * (sin(2.0 * cp.x + t * 1.49) * sin(5.0 * cp.y + ph)
             + sin(5.0 * cp.x - t * 2.85) * sin(2.0 * cp.y + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.05;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.23), field(p, time, 0.46));
	col = 0.5 + 0.5 * col;
	col *= 0.80 + 0.16 * sin(gl_FragCoord.y * 1.48 + time * 6.85);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
