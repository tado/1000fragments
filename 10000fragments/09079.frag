uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 6.19 + t * 2.95 + ph) + sin(p.y * 5.74 - t * 2.95 + ph)
        + sin((p.x + p.y) * 7.61 + t * 2.95 + ph) + sin(length(p) * 6.04 - t * 2.95 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.06;
	p *= 1.0 + 0.16 * sin(time * 1.51);
	{ float iv = dot(p, p) + 0.05; p = p / iv * 0.69; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.28), field(p, time, 0.56));
	col = 0.5 + 0.5 * col;
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.10;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
