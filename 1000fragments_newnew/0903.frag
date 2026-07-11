uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float pa = atan(p.y, p.x) + t * 0.10;
    float pk = 6.2831853 / 3.0;
    float pd = cos(floor(0.5 + pa / pk) * pk - pa) * length(p);
    v = sin(pd * 15.09 - t * 5.86 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(p.y * 1.07 + (time * 0.63) * 0.61) * p;
	p = mix(p, p.yx, 0.5 + 0.5 * sin((time * 0.63) * 1.32));
	float d = field(p, (time * 0.63), 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.55, 0.49, 0.55) + vec3(0.02, 0.03, 0.04);
	col += (hash21(gl_FragCoord.xy + fract((time * 0.63)) * 100.0) - 0.5) * 0.08;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.40);
	col = clamp(col, 0.0, 1.0) * vec3(1.020, 0.954, 1.009) * 1.00 + 0.038;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
