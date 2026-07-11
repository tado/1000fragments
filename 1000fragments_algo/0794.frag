uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x += p.y * -0.76;
	p *= 1.63;
	float acc = 0.0;
	for(int ri = 0; ri < 13; ri++){
		float fi = float(ri);
		float cyc = (time * 0.78) * 0.87 + hash21(vec2(fi, 1.7));
		float age = fract(cyc);
		vec2 dp = (hash22(vec2(fi, floor(cyc))) - 0.5) * 1.66;
		float dist = length(p - dp);
		acc += sin((dist - age * 1.02) * 10.46) * (1.0 - age) * exp(-dist * 0.78);
	}
	vec3 col = vec3(0.5 + 0.5 * (acc)) * vec3(0.51, 0.54, 0.57) + vec3(0.09, 0.06, 0.06);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.37);
	col = clamp(col, 0.0, 1.0) * vec3(1.021, 0.978, 0.920) * 1.00 + 0.029;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
