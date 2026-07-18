uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 13.22);
    float gsh = hash21(vec2(grow, floor(t * 9.12))) - 0.5;
    float gx = p.x + gsh * 0.56;
    v = sin(gx * 16.28 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 1.94));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.x = abs(p.x);
	p *= 2.52;
	float d = field(p, (time * 0.69), 0.0);
	vec3 col = vec3(0.963, 0.771, 0.553) * (0.05 / (abs(d) + 0.07));
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.27);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.30);
	col *= vec3(1.045, 1.009, 0.921);
	col += 0.026;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.23 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.025;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
