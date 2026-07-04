uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 2.13;
    v = 0.5 * (sin(5.0 * cp.x + t * 2.37) * sin(3.0 * cp.y + ph)
             + sin(3.0 * cp.x - t * 1.75) * sin(5.0 * cp.y + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.28), field(p, time, 2.56));
	col = 0.5 + 0.5 * col;
	col = mod(col * 1.46, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
