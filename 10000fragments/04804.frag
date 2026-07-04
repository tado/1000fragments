uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 17.12 - t * 6.97 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p += vec2(0.24, 0.95) * sin(length(p) * 3.98 - time * 1.11) * 0.30;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.06), field(p, time, 2.12));
	col = 0.5 + 0.5 * col;
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.04;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
