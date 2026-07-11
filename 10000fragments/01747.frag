uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 12.19 - t * 6.99 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p += vec2(0.91, -0.43) * sin(length(p) * 2.97 - time * 1.16) * 0.27;
	p = fract(p * 1.01) - 0.5;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.26), field(p, time, 0.51));
	col = 0.5 + 0.5 * col;
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
