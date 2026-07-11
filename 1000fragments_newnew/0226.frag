uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float pa = atan(p.y, p.x) + t * 0.12;
    float pk = 6.2831853 / 4.0;
    float pd = cos(floor(0.5 + pa / pk) * pk - pa) * length(p);
    v = sin(pd * 16.59 - t * 5.09 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.14;
	p = vec2(p.x * p.x - p.y * p.y, 2.0 * p.x * p.y) * 1.01;
	p = rot2(p.y * 1.17 + (time * 0.62) * 0.39) * p;
	p *= 1.0 + 0.22 * sin((time * 0.62) * 4.42);
	float d = 0.5 + 0.5 * field(p, (time * 0.62), 0.0);
	vec3 col = mix(vec3(0.10, 0.07, 0.12), vec3(0.60, 0.57, 0.63), d);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.44);
	col = clamp(col, 0.0, 1.0) * vec3(1.047, 0.982, 0.927) * 1.00 + 0.050;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
