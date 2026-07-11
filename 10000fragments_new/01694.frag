uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 7.03 + t * 4.55 + ph) + sin(p.y * 9.47 - t * 4.55 + ph)
        + sin((p.x + p.y) * 8.77 + t * 4.55 + ph) + sin(length(p) * 10.08 - t * 4.55 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = abs(p) - 0.28;
	p = (floor(p * 20.2) + 0.5) / 20.2;
	p = rot2(p.y * -3.66 + time * 0.72) * p;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.15, 0.33, 0.37), vec3(0.80, 0.65, 0.93), d);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.08;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
