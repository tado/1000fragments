uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 2.14 + t * 1.13 + ph) + sin(p.y * 3.71 - t * 1.13 + ph)
        + sin((p.x + p.y) * 9.34 + t * 1.13 + ph) + sin(length(p) * 9.55 - t * 1.13 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = abs(p) - 0.24;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.07), field(p, time, 2.15));
	col = 0.5 + 0.5 * col;
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.07;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
