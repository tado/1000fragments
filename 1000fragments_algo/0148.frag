uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float pa = atan(p.y, p.x) + t * 0.44;
    float pk = 6.2831853 / 4.0;
    float pd = cos(floor(0.5 + pa / pk) * pk - pa) * length(p);
    v = sin(pd * 8.57 - t * 5.34 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = p.yx;
	p *= 1.16;
	p = fract(p * 2.88) - 0.5;
	p.y += sin(p.x * 7.89 + (time * 0.57) * 3.30) * 0.33;
	p = sin(p * 2.17 + (time * 0.57) * 1.33) * 0.75;
	float d = field(p, (time * 0.57), 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.58, 0.68, 0.55) + vec3(0.02, 0.03, 0.05);
	col += (hash21(gl_FragCoord.xy + fract((time * 0.57)) * 100.0) - 0.5) * 0.11;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.63);
	col = clamp(col, 0.0, 1.0) * vec3(0.986, 0.999, 0.943) * 1.00 + 0.024;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
