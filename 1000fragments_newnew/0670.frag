uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 6.66 + t * 5.37 + ph) + sin(p.y * 12.41 - t * 4.88 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.91;
	p += vec2(-0.15, -0.94) * sin(length(p) * 4.92 - (time * 0.82) * 2.44) * 0.32;
	{ float iv = dot(p, p) + 0.05; p = p / iv * 0.82; }
	float d = field(p, (time * 0.82), 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.63, 0.63, 0.65) + vec3(0.08, 0.08, 0.05);
	col += (hash21(gl_FragCoord.xy + fract((time * 0.82)) * 100.0) - 0.5) * 0.05;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.42);
	col = clamp(col, 0.0, 1.0) * vec3(0.911, 0.968, 1.032) * 1.00 + 0.048;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
