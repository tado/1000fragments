uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 10.0 + qr * 6.06 * sin(t * 0.54) + t * 4.48 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.17;
	p = mix(p, p.yx, 0.5 + 0.5 * sin(time * 1.58));
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.36, 0.02, 0.14), vec3(0.65, 0.69, 0.91), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
