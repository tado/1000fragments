uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 5.0 + qr * 4.99 * sin(t * 0.59) + t * 4.42 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.23, 0.47, 0.28), vec3(0.71, 0.54, 0.73), d);
	col = fract(col * 1.45);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
