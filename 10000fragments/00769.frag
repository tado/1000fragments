uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 12.87 + sin(p.y * 1.50 + t * 2.06) * 4.26 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p += vec2(0.24, -0.85) * sin(length(p) * 2.34 - time * 1.22) * 0.36;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.37), field(p, time, 0.75));
	col = 0.5 + 0.5 * col;
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
